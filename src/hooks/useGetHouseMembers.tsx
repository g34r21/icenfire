import { useQueries } from '@tanstack/react-query';

const useGetHouseMembers = ({ membersUrls }: { membersUrls: string[] }) =>
  useQueries({
    queries: membersUrls.map(memberUrl => ({
      queryKey: ['getHouseMember', memberUrl],
      queryFn: async () => {
        const response = await fetch(memberUrl);
        if (!response.ok) {
          throw new Error(
            `There was a ${response.status} error while getting house member ${memberUrl}: ${response.statusText}`,
          );
        }
        const body: {
          aliases: string[];
          allegiances: string[];
          books: string[];
          born: string;
          culture: string;
          died: string;
          father: string;
          mother: string;
          name: string;
          playedBy: string[];
          povBooks: string[];
          spouse: string;
          titles: string[];
          tvSeries: string[];
          url: string;
        } = await response.json();
        return {
          ...body,
          id: body.url.split('/').at(-1),
        };
      },
    })),
    combine: (results) => {
      return {
        data: results.flatMap(result => result.data),
        isLoading: results.some(result => result.isLoading),
        errors: results.map(result => result.error),
      };
    },
  });

export default useGetHouseMembers;
