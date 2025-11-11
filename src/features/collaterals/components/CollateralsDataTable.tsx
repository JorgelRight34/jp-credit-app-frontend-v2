import { Collateral } from "../models/collateral";
import { CollateralStatus } from "../models/collateralStatus";
import EntityDataTable from "../../../components/DataTable/components/EntityDataTable";
import { CollateralQuery } from "../models/collateralQuery";
import {
  collateralAgreementTypeSpanishTranslations,
  collateralsQueryKey,
  defaultCollateralPhotoUrl,
} from "../lib/constants";
import { CollateralAgreementType } from "../models/collateralAgreementType";
import { EntityDataTableProps } from "@/models";
import { getCollaterals } from "../services/collateralsClient";
import { useRouter } from "@/hooks/useRouter";
import { useMemo } from "react";
import { Column } from "@/components/DataTable/models/column";
import LinkToLoan from "@/features/Loans/components/LinkToLoan";
import { DateLabel } from "@/components/ui";
import { showColumnsIfAssertion, toCurrency } from "@/utils/utils";
import { ShowPhotoIcon } from "@/components/DataTable";
import LinkToProfile from "@/features/Profiles/components/LinkToProfile";

type CollateralsDataTableProps = EntityDataTableProps<
  Collateral,
  CollateralQuery
> & {
  status?: CollateralStatus;
  type?: CollateralAgreementType;
};

/**
 * CollateralsDataTable component displays a table of collaterals.
 * It uses the DataTable component to render the data in a tabular format.
 */
const CollateralsDataTable = ({
  showClient = true,
  query,
  status,
  type,
}: CollateralsDataTableProps) => {
  const router = useRouter();

  const columns = useMemo<Column<Collateral>[]>(
    () => [
      { accessorKey: "id", header: "Id", enableSorting: true },
      {
        accessorKey: "loanId",
        header: "Préstamo",
        enableSorting: true,
        cell: ({ row }) => <LinkToLoan id={row.original.loanId} />,
      },
      {
        accessorKey: "createdAt",
        header: "Fecha",
        enableSorting: true,
        cell: ({ row }) => <DateLabel date={row.original.createdAt} />,
      },

      { accessorKey: "title", header: "Título", enableSorting: true },
      {
        header: "Valor",
        accessorKey: "value",
        enableSorting: true,
        cell: ({ row }) => toCurrency(row.original.value),
      },
      ...(showClient
        ? ([
            {
              accessorKey: "clientId",
              header: "Cliente",
              enableSorting: true,
              cell: ({ row }) => (
                <LinkToProfile
                  profile={row.original.ownerName}
                  onClick={(event: React.MouseEvent) => event.stopPropagation()}
                />
              ),
            },
          ] as Column<Collateral>[])
        : []),
      ...showColumnsIfAssertion(
        status === CollateralStatus.USED_FOR_SETTLEMENT,
        [
          {
            accessorKey: "liquidationDate",
            header: "Fecha Liquidacion",
            enableSorting: true,
            cell: ({ row }) => (
              <DateLabel date={row.original.liquidationDate ?? ""} />
            ),
          },
        ] as Column<Collateral>[]
      ),
      {
        accessorKey: "type",
        header: "Tipo",
        enableSorting: true,
        cell: ({ row }) =>
          collateralAgreementTypeSpanishTranslations[row.original.type],
      },
      {
        header: "Foto",
        cell: ({ row }) => (
          <ShowPhotoIcon
            src={row.original.photos[0]?.url || defaultCollateralPhotoUrl}
          />
        ),
      },
    ],
    [showClient, status]
  );

  return (
    <EntityDataTable<Collateral, CollateralQuery>
      title="Garantía"
      loader={getCollaterals}
      cacheKey={[collateralsQueryKey, type, status]}
      columns={columns}
      onRowClick={(collateral: Collateral) =>
        router.push(`/collaterals/${collateral.id}`)
      }
      query={query}
    />
  );
};

export default CollateralsDataTable;
