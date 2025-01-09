import { useState } from 'react';
import { useCustomers } from '@/contexts/CustomerContext';
import { useEmailTemplate } from '@/contexts/EmailTemplateContext';
import { EmailData } from '@/types/email';
import EmailForm from '@/components/forms/EmailForm';
import EmailPreview from '@/components/emails/EmailPreview';
import { getEmailTemplate } from '@/lib/email';
import { Button } from "@/components/ui/button";

export default function EnviarEmail() {
  const { customers } = useCustomers();
  const { templates } = useEmailTemplate();
  const [emailData, setEmailData] = useState<EmailData | null>(null);

  const handleEmailSubmit = (data: EmailData) => {
    setEmailData(data);
  };

  const handleSendEmail = () => {
    // Implementar lógica de envio
    setEmailData(null);
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Coluna da Esquerda - Formulário */}
      <div className="bg-white dark:bg-[#1C1C1C] rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-6">Inserção de Dados</h2>
        <EmailForm 
          onSubmit={handleEmailSubmit}
          customers={customers}
        />
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
  );
}