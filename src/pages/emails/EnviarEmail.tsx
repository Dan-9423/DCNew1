import { useState } from 'react';
import { useCustomers } from '@/contexts/CustomerContext';
import { useEmailTemplate } from '@/contexts/EmailTemplateContext';
import { EmailData } from '@/types/email';
import EmailForm from '@/components/forms/EmailForm';
import EmailPreview from '@/components/emails/EmailPreview';
import EmailHistoryList from '@/components/emails/EmailHistoryList';
import { getEmailTemplate } from '@/lib/email';
import { Button } from "@/components/ui/button";

export default function EnviarEmail() {
  const { customers } = useCustomers();
  const { templates } = useEmailTemplate();
  const [emailData, setEmailData] = useState<EmailData | null>(null);
  const [history] = useState([
    {
      id: '1',
      emailData: {
        razaoSocial: 'Empresa ABC Ltda',
        email: 'financeiro@abc.com',
        numeroNF: 'NF-123456',
        valorTotal: 1500.50,
      },
      status: 'sent',
      sentAt: '2024-03-20T10:30:00Z'
    }
  ]);

  const handleEmailSubmit = (data: EmailData) => {
    setEmailData(data);
  };

  const handleSendEmail = () => {
    // Implementar lógica de envio
    setEmailData(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        {/* Coluna da Esquerda - Formulário */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#1C1C1C] rounded-lg p-6 shadow-lg">
            <EmailForm 
              onSubmit={handleEmailSubmit}
              customers={customers}
            />
          </div>

          <div className="bg-white dark:bg-[#1C1C1C] rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Histórico de E-mails</h2>
            <EmailHistoryList
              history={history}
              onView={(email) => {
                setEmailData(email.emailData);
              }}
            />
          </div>
        </div>

        {/* Coluna da Direita - Preview */}
        <div className="bg-white dark:bg-[#1C1C1C] rounded-lg p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Visualização do E-mail</h2>
            {emailData && (
              <Button onClick={handleSendEmail}>
                Enviar E-mail
              </Button>
            )}
          </div>
          
          {emailData ? (
            <EmailPreview
              data={emailData}
              template={getEmailTemplate(emailData, templates[0]?.content || '')}
            />
          ) : (
            <div className="flex items-center justify-center h-[600px] text-muted-foreground">
              Preencha os dados do e-mail para visualizar
            </div>
          )}
        </div>
      </div>
    </div>
  );
}