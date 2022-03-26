import { StackNavigationProp } from '@react-navigation/stack';
import {
  Spacer,
  View,
  Text,
  Button,
  Row,
  ChevronRightIcon,
  ExtensionsIcon,
  scale,
  Divider,
  Heading,
} from 'expo-dev-client-components';
import * as React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import { ActivityIndicator } from '../components/ActivityIndicator';
import { AppHeader } from '../components/AppHeader';
import { EASBranchRow } from '../components/EASUpdatesRows';
import { useBuildInfo } from '../providers/BuildInfoProvider';
import { useBranchesForApp } from '../queries/useBranchesForApp';
import { ExtensionsStackParamList } from './ExtensionsStack';

const extensions = ['updates'];
const hasEASUpdatesInstalled = extensions.includes('updates');

type ExtensionsScreenProps = {
  navigation: StackNavigationProp<ExtensionsStackParamList>;
};

export function ExtensionsScreen({ navigation }: ExtensionsScreenProps) {
  return (
    <View>
      <AppHeader navigation={navigation} />
      <ScrollView contentContainerStyle={{ paddingBottom: scale['48'] }}>
        <View flex="1">
          {extensions.length === 0 && (
            <View bg="default" mx="medium" py="medium" px="medium" rounded="medium">
              <View align="centered">
                <ExtensionsIcon />
              </View>
              <Spacer.Vertical size="medium" />
              <View px="small">
                <Text size="small" align="center">
                  Extensions allow you to customize your development app with additional
                  capabilities.
                </Text>
              </View>

              <Spacer.Vertical size="small" />

              <View align="centered">
                <Button.ScaleOnPressContainer bg="ghost" rounded="small">
                  <View border="default" px="small" py="2" rounded="small">
                    <Button.Text color="ghost" weight="semibold" size="small">
                      Learn More
                    </Button.Text>
                  </View>
                </Button.ScaleOnPressContainer>
              </View>
            </View>
          )}

          {hasEASUpdatesInstalled && (
            <>
              <Spacer.Vertical size="medium" />
              <EASUpdatesPreview navigation={navigation} />
              <Spacer.Vertical size="medium" />
            </>
          )}

          <View px="xl">
            <Text size="small" color="secondary">
              Extensions allow you to customize your development app with additional capabilities.{' '}
              <Text size="small" color="secondary">
                Learn more.
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function EASUpdatesPreview({ navigation }: ExtensionsScreenProps) {
  const { appId } = useBuildInfo();
  const { isLoading, data: branches } = useBranchesForApp(appId);

  function onSeeAllBranchesPress() {
    navigation.navigate('Branches');
  }

  function onBranchPress(branchName: string) {
    navigation.navigate('Updates', { branchName });
  }

  if (isLoading) {
    return (
      <View height="44" align="centered">
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View>
      <View mx="medium">
        <View py="small" px="small">
          <Heading size="small" color="secondary">
            EAS Updates
          </Heading>
        </View>
        {branches?.slice(0, 2).map((branch, index) => {
          const isFirst = index === 0;

          return (
            <View key={branch.name}>
              <Button.ScaleOnPressContainer
                bg="default"
                onPress={() => onBranchPress(branch.name)}
                roundedBottom="none"
                roundedTop={isFirst ? 'large' : 'none'}>
                <View
                  bg="default"
                  roundedTop={isFirst ? 'large' : 'none'}
                  roundedBottom="none"
                  py="small"
                  px="small">
                  <EASBranchRow branch={branch} />
                </View>
              </Button.ScaleOnPressContainer>
              <Divider />
            </View>
          );
        })}

        {branches?.length > 0 && (
          <Button.ScaleOnPressContainer
            onPress={onSeeAllBranchesPress}
            bg="default"
            roundedTop="none"
            roundedBottom="large">
            <View bg="default" py="small" px="small" roundedTop="none" roundedBottom="large">
              <Row>
                <Text size="medium">See all branches</Text>
                <Spacer.Horizontal />
                <ChevronRightIcon />
              </Row>
            </View>
          </Button.ScaleOnPressContainer>
        )}
      </View>
    </View>
  );
}
