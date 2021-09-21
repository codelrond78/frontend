import { useQuery } from 'react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { request, gql } from 'graphql-request';

const endpoint = 'http://localhost:8080/grapqhl'

export const useAuthQuery = (name, query, variables) => {
    return useQuery(name, async () => {
        const { getAccessTokenSilently } = useAuth0();
        const token = await getAccessTokenSilently();
        
        const result = await request(endpoint, query, variables, {headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        return result[name]
    });
}

export const useGetSchool = () => {
    
    const query = gql`
        query school{
            school{
                id
                name
            }
        }
    `;
    
    return useAuthQuery('school', query);
}