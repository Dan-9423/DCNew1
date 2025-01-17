import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { CurrencyInput } from '@/components/ui/currency-input';
import { Customer } from '@/types/customer';
import { EmailData } from '@/types/email';

const formSchema = z.object({
  razaoSocial: z.string().min(1, 'Razão Social é obrigatória'),
  nomeFantasia: z.string().optional(),
  cnpj: z.string().min(1, 'CNPJ é obrigatório'),
  email: z.string().email('E-mail inválido'),
  telefone: z.string().optional(),
  numeroNF: z.string().min(1, 'Número da NF é obrigatório'),
  valorTotal: z.number().min(0.01, 'Valor deve ser maior que zero'),
});

interface EmailFormProps {
  onSubmit: (data: EmailData) => void;
  customers: Customer[];
}

export default function EmailForm({ onSubmit, customers }: EmailFormProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCustomerSearch, setShowCustomerSearch] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      razaoSocial: '',
      nomeFantasia: '',
      cnpj: '',
      email: '',
      telefone: '',
      numeroNF: '',
      valorTotal: 0,
    },
  });

  const handleCustomerSelect = (customer: Customer) => {
    form.setValue('razaoSocial', customer.razaoSocial);
    form.setValue('nomeFantasia', customer.nomeFantasia);
    form.setValue('cnpj', customer.cnpj);
    form.setValue('email', customer.email);
    form.setValue('telefone', customer.telefone || '');
    setShowCustomerSearch(false);
    setSearchQuery('');
  };

  const filteredCustomers = customers.filter(customer =>
    searchQuery && (
      customer.razaoSocial.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.nomeFantasia.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.cnpj.includes(searchQuery)
    )
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="relative">
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowCustomerSearch(true)}
            placeholder="Buscar sacado por nome, nome fantasia ou CNPJ..."
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          {showCustomerSearch && filteredCustomers.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-popover rounded-lg shadow-lg border">
              <ul className="py-1">
                {filteredCustomers.map((customer) => (
                  <li
                    key={customer.id}
                    className="px-4 py-2 hover:bg-accent cursor-pointer"
                    onClick={() => handleCustomerSelect(customer)}
                  >
                    <div className="font-medium">{customer.razaoSocial}</div>
                    <div className="text-sm text-muted-foreground">
                      {customer.nomeFantasia} • {customer.cnpj}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="razaoSocial"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Razão Social</FormLabel>
                <FormControl>
                  <Input {...field} readOnly />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nomeFantasia"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome Fantasia</FormLabel>
                <FormControl>
                  <Input {...field} readOnly />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cnpj"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CNPJ</FormLabel>
                <FormControl>
                  <Input {...field} readOnly />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input {...field} type="email" readOnly />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="numeroNF"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número da NF</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="telefone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <Input {...field} readOnly />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="valorTotal"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Valor Total</FormLabel>
                <FormControl>
                  <CurrencyInput
                    value={field.value}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full">
          Visualizar E-mail
        </Button>
      </form>
    </Form>
  );
}