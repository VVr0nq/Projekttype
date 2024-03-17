export interface Story {
    id: number;
    name: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    project: number; // ID projektu, do którego historia jest przypisana
    createdDate: Date;
    status: 'todo' | 'doing' | 'done';
    ownerId: number; // ID właściciela historii
}