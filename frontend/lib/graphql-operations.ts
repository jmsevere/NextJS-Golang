import { gql } from '@apollo/client';

export const GET_LAST_PING = gql`
  query GetLastPing {
    getLastPing {
      id
      timestamp
    }
  }
`;

export const SEND_PING = gql`
  mutation SendPing($input: NewPing!) {
    sendPing(input: $input) {
      id
      timestamp
    }
  }
`;

export const LIVE_PING_SUBSCRIPTION = gql`
  subscription LivePing {
    livePing {
      id
      timestamp
    }
  }
`;
