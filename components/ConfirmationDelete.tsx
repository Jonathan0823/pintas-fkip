import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DeleteItem } from "@/lib/item-action";
import { FaTrashAlt } from "react-icons/fa";

export function ConfirmationDelete({
  itemId,
  onSuccess,
}: {
  itemId: string;
  onSuccess: () => void;
}) {
  const handleDelete = async () => {
    await DeleteItem(itemId);
    onSuccess();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <FaTrashAlt className="absolute top-2 left-2 text-3xl text-red-500 cursor-pointer" />
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white font-sans rounded-3xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="rounded-xl bg-red-500 text-white"
            onClick={handleDelete}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
