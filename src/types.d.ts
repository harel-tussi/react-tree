type ICategoryNode = {
  id: string;
  categoryName: string;
  children: ICategoryNode[];
  root: boolean;
  v: number;
};
