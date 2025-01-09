import { useState } from 'react';
import EmailHistoryList from '@/components/emails/EmailHistoryList';
import { EmailData } from '@/types/email';
import EmailPreview from '@/components/emails/EmailPreview';
import { useEmailTemplate } from '@/contexts/EmailTemplateContext';
import { getEmailTemplate } from '@/lib/email';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function HistoricoEmails() {
  const { templates } = useEmailTemplate();
  const [selectedEmail, setSelectedEmail] = useState<EmailData | null>(null);
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

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-[#1C1C1C] rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-6">Histórico de E-mails</h2>
        <EmailHistoryList
          history={history}
          onView={(email) => setSelectedEmail(email.emailData)}
        />
      </div>

      <Dialog open={!!selectedEmail} onOpenChange={() => setSelectedEmail(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Visualização do E-mail</DialogTitle>
          </DialogHeader>
          {selectedEmail && (
            <EmailPreview
              data={selectedEmail}
              template={getEmailTemplate(selectedEmail, templates[0]?.content || '')}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}