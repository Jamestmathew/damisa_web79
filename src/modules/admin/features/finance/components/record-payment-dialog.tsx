"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoadingButton, FormStatusMessage } from "@/modules/auth/components/ui";

import { recordPaymentAction } from "../actions/record-payment.action";
import { recordPaymentSchema, type RecordPaymentSchema } from "../validation/record-payment.schema";
import type { FinanceActionResult } from "../types";

export function RecordPaymentDialog({ onSaved }: { onSaved: () => void }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState<FinanceActionResult | null>(null);

  const form = useForm<RecordPaymentSchema>({
    resolver: zodResolver(recordPaymentSchema),
    defaultValues: { payerName: "", payerEmail: "", purpose: "", amountNaira: 0, reference: "" },
  });

  function onSubmit(values: RecordPaymentSchema) {
    setState(null);
    startTransition(async () => {
      const formData = new FormData();
      formData.set("payerName", values.payerName);
      formData.set("payerEmail", values.payerEmail);
      formData.set("purpose", values.purpose);
      formData.set("amountNaira", String(values.amountNaira));
      formData.set("reference", values.reference);

      const result = await recordPaymentAction(null, formData);
      setState(result);

      if (!result.ok && result.fieldErrors) {
        for (const [field, message] of Object.entries(result.fieldErrors)) {
          if (message) form.setError(field as keyof RecordPaymentSchema, { message });
        }
        return;
      }

      if (result.ok) {
        setOpen(false);
        form.reset();
        onSaved();
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={(next) => { setOpen(next); if (!next) setState(null); }}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4" />
          Record payment
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Record manual payment</DialogTitle>
          <DialogDescription>For payments received outside the online payment flow (cash, etc.).</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          {state && !state.ok ? <FormStatusMessage variant="error" message={state.error} /> : null}

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <FormField
              control={form.control}
              name="payerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payer name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="payerEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payer email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="purpose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Purpose</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Tuition - Fall 2026" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="amountNaira"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount (₦)</FormLabel>
                    <FormControl>
                      <Input type="number" min={0} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="reference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reference</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. TXN-88217" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <LoadingButton type="submit" className="w-full" isLoading={isPending} loadingText="Recording...">
              Record payment
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
