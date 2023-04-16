

import React from 'react';

export const PollIcon: React.FC<{
  iconName: string
}> = ({ iconName }) => {
  return <img alt={''} src={`${process.env.PUBLIC_URL}/svg/${iconName}`} />
}
