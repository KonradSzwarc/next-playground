import { ActionIcon, Button, Group } from '@mantine/core';
import { IconPlus } from '@tabler/icons';

const IndexPage = () => (
  <Group mt={50} position="center">
    <Button size="xl">Welcome to Mantine!</Button>
    <ActionIcon size="xl" variant="filled" color="brand">
      <IconPlus size={24} />
    </ActionIcon>
  </Group>
);

export default IndexPage;
