import { View, Text, WarningIcon, Row, Spacer, Heading } from 'expo-dev-client-components';
import * as React from 'react';

function ErrorToast({ children }) {
  return (
    <View mx="medium">
      <View bg="error" padding="medium" rounded="medium" border="error">
        <Text color="error" weight="medium">
          {children}
        </Text>
      </View>
    </View>
  );
}

function WarningToast({ children }) {
  return (
    <View mx="large">
      <View bg="warning" padding="medium" rounded="medium" border="warning">
        <Row align="center">
          <WarningIcon />

          <Spacer.Horizontal size="tiny" />

          <Heading color="warning" size="small" style={{ top: 1 }}>
            Warning
          </Heading>
        </Row>

        <Spacer.Vertical size="small" />

        <View>
          <Text size="small">{children}</Text>
        </View>
      </View>
    </View>
  );
}

export const Toast = {
  Error: ErrorToast,
  Warning: WarningToast,
};
