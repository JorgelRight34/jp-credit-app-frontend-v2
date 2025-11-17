import {
  Column,
  DateLabel,
  EntityDataTable,
  EntityDataTableProps,
  ShowPhotoIcon,
} from "@/components";
import { Collateral } from "../models/collateral";
import { CollateralQuery } from "../models/collateralQuery";
import { CollateralStatus } from "../models/collateralStatus";
import { CollateralAgreementType } from "../models/collateralAgreementType";
import { useRouter } from "@/hooks/useRouter";
import { LinkToLoan } from "@/features/loans";
import { toCurrency } from "@/utils/utils";
import {
  collateralAgreementTypeSpanishTranslations,
  collateralsQueryKey,
  defaultCollateralPhotoUrl,
} from "../lib/constants";
import { collateralClient } from "../services/collateralsClient";

type CollateralsDataTableProps = EntityDataTableProps<
  Collateral,
  CollateralQuery
> & {
  status?: CollateralStatus;
  type?: CollateralAgreementType;
};

const columns: Column<Collateral>[] = [
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
];

/**
 * CollateralsDataTable component displays a table of collaterals.
 * It uses the DataTable component to render the data in a tabular format.
 */
const CollateralsDataTable = ({
  query,
  status,
  type,
  ...props
}: CollateralsDataTableProps) => {
  const router = useRouter();

  return (
    <EntityDataTable
      title="Garantía"
      loader={collateralClient.getCollaterals}
      cacheKey={[collateralsQueryKey, type, status]}
      columns={columns}
      onRowClick={(collateral: Collateral) =>
        router.push(`/collaterals/${collateral.id}`)
      }
      query={query}
      {...props}
    />
  );
};

export default CollateralsDataTable;
