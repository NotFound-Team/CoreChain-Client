import { IPagination } from "./common";

export interface IFeedback {
  _id: string;
  encryptedEmployeeId: string;
  category: string;
  isFlagged: boolean;
  wasDecrypted: boolean;
  decryptionReason: string;
  decryptedBy: {
    _id: string;
    email: string;
  };
  approvedBy: string;
  title: string;
  content: string;
  isDeleted: boolean;
  createdAt: Date;
  deletedAt: Date;
  deletedBy: {
    _id: string;
    email: string;
  };
}

export type TCreateFeedback = Pick<IFeedback, "category" | "title" | "content"> & {
  sender: string;
};

export type TUpdateFeedback = Partial<TCreateFeedback>;

export type TDecryptFeedbackRequest = {
  reason: string;
  approvedBy: string;
  secretKey: string;
};

export type TQueryFeedback = Partial<Pick<IFeedback, "category" | "isFlagged" | "wasDecrypted" | "isDeleted">> &
  IPagination;
