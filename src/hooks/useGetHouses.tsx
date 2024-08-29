import { keepPreviousData, useQuery } from '@tanstack/react-query';

const PAGE_SIZE = 10;

const getTotalCountFromLinkHeader = (linkHeader: string): number | null => {
  const linkHeaderPattern = /<([^>]+)>; rel="([^"]+)"/g;
  const links: {
    [rel: string]: string;
  } = {};

  const linkMatches = [...linkHeader.matchAll(linkHeaderPattern)];
  linkMatches.forEach((match) => {
    const [_, url, rel] = match;
    if (!rel || !url) {
      return;
    }
    links[rel] = url;
  });

  const lastPageMatch = links.last?.match(/page=(\d+)/)?.[1];
  const lastPage = lastPageMatch ? Number.parseInt(lastPageMatch, 10) : null;
  const lastPageSizeMatch = links.last?.match(/pageSize=(\d+)/)?.[1];
  const lastPageSize = lastPageSizeMatch
    ? Number.parseInt(lastPageSizeMatch, 10)
    : null;

  if (lastPage !== null && lastPageSize !== null) {
    const totalCount = (lastPage - 1) * PAGE_SIZE;

    return totalCount + lastPageSize;
  }

  return null;
};

const useGetHouses = ({ page }: { page: number }) =>
  useQuery({
    queryKey: ['getHouses', page],
    queryFn: async () => {
      const response = await fetch(
        `https://anapioficeandfire.com/api/houses?page=${page}&pageSize=${PAGE_SIZE}`,
      );
      if (!response.ok) {
        throw new Error(
          `There was a ${response.status} error while getting houses: ${response.statusText}`,
        );
      }
      const body: {
        name: string;
        swornMembers: string[];
        ancestralWeapons: string[];
        cadetBranches: string[];
        coatOfArms: string;
        currentLord: string;
        diedOut: string;
        founded: string;
        founder: string;
        heir: string;
        overlord: string;
        region: string;
        seats: string[];
        titles: string[];
        url: string;
        words: string;
      }[] = await response.json();
      const linkHeader = response.headers.get('link');
      const totalCount = linkHeader
        ? getTotalCountFromLinkHeader(linkHeader)
        : null;
      return {
        pageResults: body.map(house => ({
          ...house,
          id: house.url.split('/').at(-1),
        })),
        totalCount,
      };
    },
    placeholderData: keepPreviousData,
  });

export default useGetHouses;
