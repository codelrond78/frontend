import { useQuery } from 'react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { request, gql, GraphQLClient } from 'graphql-request';

const endpoint = 'http://localhost:8080/grapqhl';
const graphQLClient = new GraphQLClient(endpoint);

export const useAuthQuery = (name, query, variables) => {
    return useQuery(name, async () => {
        const { getAccessTokenSilently } = useAuth0();
        const token = await getAccessTokenSilently();
        
        graphQLClient.setHeader("Authorization", `Bearer ${token}`);
        
        const data = await graphQLClient.request(query)
        return data[name]
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