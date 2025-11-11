import { useParams } from "react-router";
import EntityLayout from "../../../layouts/EntityLayout/EntityLayout";
import ProfileInfo from "../../Profiles/components/ProfileInfo";
import LoanInfo from "../../Loans/components/LoanInfo";
import TransactionInfo from "../components/TransactionInfo";
import { Tab, Tabs } from "@/components/Tabs";
import { useTransaction } from "../hooks/useTransaction";
import { deleteTransaction } from "../services/transactionsClient";
import { ConfirmationModal } from "@/components/Modal";
import { useState } from "react";
import { LoadingSpinner } from "@/components/ui";

const TransactionPage = () => {
  const { id } = useParams();
  const { transaction, isLoading } = useTransaction({ id });
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (isLoading) return <LoadingSpinner />;
  if (!transaction) return;

  return (
    <>
      <EntityLayout
        title={`Transacción #${id}`}
        onDelete={() => setShowDeleteModal(true)}
        isDeleteDisabled={transaction.isClosed}
        deleteDisabledTooltip="No se puede eliminar esta transacción porque el proceso está cerrado"
      >
        <Tabs defaultActiveKey="info">
          <Tab path="info" title="Transacción">
            <TransactionInfo transaction={transaction} />
          </Tab>
          {transaction.payerId && (
            <Tab title="Cliente" path="payer">
              <ProfileInfo id={transaction.payerId} />
            </Tab>
          )}
          <Tab path="loan" title="Préstamo">
            <LoanInfo id={transaction.loanId} />
          </Tab>
        </Tabs>
      </EntityLayout>
      <ConfirmationModal
        height="auto"
        destructive={true}
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        description={
          "¿Está seguro de que desea eliminar esta transacción? Esta acción no se puede deshacer y modificará el balance del préstamo."
        }
        onConfirm={() => deleteTransaction(id!)}
        confirmationMessage={`Confirmo que deseo eliminar la transacción ${transaction.type.toUpperCase()}-${
          transaction.id
        } asociada al préstamo ${transaction.loanId}.`}
      />
    </>
  );
};

export default TransactionPage;
