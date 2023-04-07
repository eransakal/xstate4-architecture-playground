import { Avatar } from '@chakra-ui/react';
import React from 'react';

export const UserAvatar: React.FC<{
  size?: 'sm' | 'md';
  fullName: string;
  isOnline?: boolean;
  userId?: string;
  avatarUrl: string | null;
}> = ({ size, isOnline, fullName, avatarUrl }) => {
  return (
    <Avatar
      size={size || 'md'}
      name={fullName}
      src={`${process.env.PUBLIC_URL}/users/${avatarUrl}`}
    />
  );
};
