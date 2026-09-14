"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Wallet, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DataTable, EntityToolbar, ConfirmDialog } from "@/shared/components";
import { PaymentStatusBadge } from "@/modules/admin/shared/components";
import type { DataTableColumn } from "@/shared/types";

import { verifyPaymentAction } from "../actions/verify-payment.action";
import type { PaymentRecord } from "../types";

import { RecordPaymentDialog } from "./record-payment-dialog";

const METHOD_LABEL: Record<PaymentRecord["method"], string> = {
  card: "Card",
  bank_transfer: "Bank Transfer",
  cash: "Cash",
  manual: "Manual Entry",
};

export function FinanceManager({ payments }: { payments: PaymentRecord[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return payments;
    return payments.filter(
      (payment) =>
        payment.payerName.toLowerCase().includes(q) ||
        payment.reference.toLowerCase().includes(q) ||
        payment.purpose.toLowerCase().includes(q)
    );
  }, [payments, query]);

  const totalPaid = payments.filter((p) => p.status === "paid").reduce((sum, p) => sum + p.amountNaira, 0);
  const totalPending = payments.filter((p) => p.status === "pending").reduce((sum, p) => sum + p.amountNaira, 0);

  const columns: DataTableColumn<PaymentRecord>[] = [
    {
      key: "payer",
      header: "Payer",
      render: (payment) => (
        <div>
          <p className="font-medium text-foreground">{payment.payerName}</p>
          <p className="text-xs text-muted-foreground">{payment.purpose}</p>
        </div>
      ),
    },
    { key: "amount", header: "Amount", render: (payment) => `₦${payment.amountNaira.toLocaleString()}` },
    { key: "method", header: "Method", render: (payment) => METHOD_LABEL[payment.method] },
    { key: "reference", header: "Reference", render: (payment) => payment.reference },
    { key: "status", header: "Status", render: (payment) => <PaymentStatusBadge status={payment.status} /> },
    {
      key: "actions",
      header: "",
      className: "text-right",
      render: (payment) =>
        payment.status === "pending" ? (
          <div className="flex justify-end">
            <ConfirmDialog
              trigger={
                <Button variant="ghost" size="icon" aria-label={`Verify payment from ${payment.payerName}`}>
                  <CheckCircle2 className="size-4 text-success" />
                </Button>
              }
              title="Verify payment"
              description={`Mark this ₦${payment.amountNaira.toLocaleString()} payment from ${payment.payerName} as paid.`}
              confirmLabel="Verify"
              onConfirm={async () => {
                await verifyPaymentAction(payment.id);
                router.refresh();
              }}
            />
          </div>
        ) : null,
    },
  ];

  return (
    <div>
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">Total verified</p>
          <p className="mt-1 text-xl font-semibold text-foreground">₦{totalPaid.toLocaleString()}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">Pending verification</p>
          <p className="mt-1 text-xl font-semibold text-foreground">₦{totalPending.toLocaleString()}</p>
        </div>
      </div>

      <EntityToolbar
        searchValue={query}
        onSearchChange={setQuery}
        searchPlaceholder="Search payments..."
        action={<RecordPaymentDialog onSaved={() => router.refresh()} />}
      />
      <DataTable
        columns={columns}
        rows={filtered}
        getRowId={(payment) => payment.id}
        emptyIcon={Wallet}
        emptyTitle="No payments found"
      />
    </div>
  );
}
