import { ItemType } from "./Items";

export type PinjamType = {
  id: string;
  nama: string;
  namaOrmawa: string;
  namaKegiatan: string;
  status: string;
  startDate: Date;
  endDate: Date;
  items: ItemType[];
};
