import { PutUserDto } from "./user.put.dto";

export interface PatchUserDto extends Partial<PutUserDto> {}
