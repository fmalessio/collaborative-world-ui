export class Category {
    id: number;
    name: string;
    description: string;
    parentId: number;
    children: Category[];
}
