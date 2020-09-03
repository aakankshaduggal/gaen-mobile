import React, { FunctionComponent } from "react"
import { Alert, Linking } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"

import { useSystemServicesContext } from "../SystemServicesContext"
import { ActivationStatus } from "./ActivationStatus"
import { HomeScreens } from "../navigation"

export const LocationActivationStatus: FunctionComponent = () => {
  const navigation = useNavigation()
  const { t } = useTranslation()
  const {
    isLocationOn,
    isLocationNeeded: showLocationStatus,
  } = useSystemServicesContext()

  const handleOnPressFix = () => {
    showFixLocationAlert()
  }

  const handleOnPressShowInfo = () => {
    navigation.navigate(HomeScreens.LocationInfo)
  }

  const showFixLocationAlert = () => {
    Alert.alert(
      t("home.bluetooth.location_disabled_error_title"),
      t("home.bluetooth.location_disabled_error_message"),
      [
        {
          text: t("common.cancel"),
          style: "cancel",
        },
        {
          text: t("common.settings"),
          onPress: () => Linking.openSettings(),
        },
      ],
    )
  }

  if (!showLocationStatus) {
    return null
  }

  return (
    <ActivationStatus
      headerText={t("home.bluetooth.location_header")}
      isActive={isLocationOn}
      infoAction={handleOnPressShowInfo}
      fixAction={handleOnPressFix}
      testID={"home-location-status-container"}
    />
  )
}