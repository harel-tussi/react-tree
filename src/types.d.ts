interface ICategoryNode {
  id: string;
  categoryName: string;
  children: ICategoryNode[] | null;
  root: boolean;
}
