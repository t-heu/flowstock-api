import type { Context } from 'hono';

import { ApiError } from '../../core/errors/ApiError';
import * as BranchService from './branch.service';

export const branchController = {
  getAllBranch: async (c: Context) => {
    const result = await BranchService.getBranches();

    if (!result.success) {
      throw new ApiError(
        'Erro ao buscar filiais',
        500
      );
    }

    return c.json(result, 200);
  },

  createBranch: async (c: Context) => {
    const data = c.get('validatedBody');

    const result = await BranchService.addBranch(data);

    if (!result.success) {
      throw new ApiError(
        'Erro ao criar filial',
        500
      );
    }

    return c.json(result, 201);
  },

  updateBranch: async (c: Context) => {
    const id = c.req.param('id');
    const data = c.get('validatedBody');

    const result = await BranchService.updateBranch(id, data);

    if (!result.success) {
      throw new ApiError(
        'Erro ao atualizar filial',
        500
      );
    }

    return c.json(result, 200);
  },

  deleteBranch: async (c: Context) => {
    const id = c.req.param('id');

    const result = await BranchService.deleteBranch(id);

    if (!result.success) {
      throw new ApiError(
        'Erro ao deletar filial',
        500
      )
    }

    return c.json(result, 200);
  }
};
