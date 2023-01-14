import type { ComponentPropsWithRef, ComponentType } from 'react';
import { Button, Group, GroupProps } from '@mantine/core';

export interface OAuthProviderUiData {
  id: string;
  name: string;
  icon: ComponentType<ComponentPropsWithRef<'svg'>>;
  onClick: () => void;
}

export interface OAuthProvidersProps extends GroupProps {
  providers: OAuthProviderUiData[];
}

export const OAuthProviders = ({ providers, ...props }: OAuthProvidersProps) => (
  <Group grow {...props}>
    {providers.map(({ id, name, icon: Icon, onClick }) => (
      <Button
        key={id}
        onClick={onClick}
        leftIcon={<Icon width={16} height={16} />}
        variant="default"
        color="gray"
        radius="xl"
      >
        {name}
      </Button>
    ))}
  </Group>
);
