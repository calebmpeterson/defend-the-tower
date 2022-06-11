import { TransactionInterface_UNSTABLE } from "recoil";
import { Update } from "../engine";

type Transaction = Pick<TransactionInterface_UNSTABLE, "get" | "set">;

export type Updater = (
  transaction: Transaction,
  deltaT: number,
  update: Update
) => void;
