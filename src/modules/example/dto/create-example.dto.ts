export class CreateExampleDto {
  title: string;
  description?: string;
  count?: number;
  isActive?: boolean;
  metadata?: Record<string, any>;
  status?: 'draft' | 'published' | 'archived';
}
