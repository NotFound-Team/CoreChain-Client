"use client";

import { useRouter, useParams } from "next/navigation";
import ContractDetailModal from "../../ContractDetailModal";

export default function ContractDetailInterceptPage() {
  const params = useParams();
  const id = params.id as string;

  return <ContractDetailModal contractId={id} />;
}
