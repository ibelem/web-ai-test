import { error } from '@sveltejs/kit';

export const load = ({ params }) => {
  console.log(params.path);
  console.log(params.path.split('/').length)

  if (params.path.split('/').length !== 4) throw error(404, 'Not Found');

  return {
    params
  }
}