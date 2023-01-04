import { ActionIcon, Button, Group } from '@mantine/core';

import { Plus } from '@/generated/icons';

const IndexPage = () => (
  <Group mt={50} position="center">
    <Button size="xl">Welcome to Mantine!</Button>
    <ActionIcon size="xl" variant="filled" color="brand">
      <Plus width={24} height={24} />
    </ActionIcon>
  </Group>
);

export default IndexPage;
