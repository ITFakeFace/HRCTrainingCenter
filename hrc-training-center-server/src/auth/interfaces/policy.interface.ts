export interface PolicyMetadata {
  // Danh sách các Role được phép truy cập (Chỉ cần user có 1 trong các Role này là được - Logic: OR)
  roles?: string[];

  // Mảng quyền đa chiều (Logic: OR giữa các mảng con, AND bên trong mảng con)
  // Example: [['BATCH_CREATE', 'BATCH_READ'], ['SUPER_PERM']]
  permissions?: string[][];
}
