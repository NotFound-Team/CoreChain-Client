import { notFound } from "next/navigation";
import ContractDetailModal from "../../../ContractDetailModal";

interface DetailContractPageProps {
  params: Promise<{ id: string }>;
}

export default async function ContractDetailSlot({ params }: DetailContractPageProps) {
  const { id } = await params;

  if (!id) {
    return notFound();
  }
  return <ContractDetailModal contractId={id} />;
}
