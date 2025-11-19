import { Tab, Tabs } from "@/components";
import { LoanInfo } from "@/features/loans";
import { ProfileInfo } from "@/features/profiles";
import { transactionClient, TransactionInfo } from "@/features/transactions";
import { EntityLayout } from "@/layouts";
import { AppPageProps } from "@/models/appPageProps";

export async function generateMetadata({ params }: AppPageProps) {
  return { title: `Transacción #${params.id}` };
}

const Page = async ({ params }: AppPageProps) => {
  const transaction = await transactionClient.getTransaction(params.id);

  return (
    <EntityLayout title={`Transacción #${params.id}`}>
      <Tabs defaultActiveKey="info">
        <Tab eventKey="info" title="Transacción">
          <TransactionInfo transaction={transaction} />
        </Tab>
        {transaction.payerId && (
          <Tab title="Cliente" eventKey="payer">
            <ProfileInfo id={transaction.payerId} />
          </Tab>
        )}
        <Tab eventKey="loan" title="Préstamo">
          <LoanInfo id={transaction.loanId} />
        </Tab>
      </Tabs>
    </EntityLayout>
  );
};

export default Page;
