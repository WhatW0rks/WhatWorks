import React from 'react'
import { View, Text, Button, StyleSheet, Image } from "react-native";

const ProfileStats = ({ title, desc }: { title: string, desc: string }) => {
  return (
    <View style={styles.profileStats}>
      <Text style={styles.profileStatsTitle}>{title}</Text>
      <Text style={styles.profileStatsDesc}>{desc}</Text>
    </View>)
}

type Props = {
  url: string,
  name: string,
  stats: { title: string, desc: string }[]
};

const Profile = ({ url, name, stats }: Props) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.dp}
        source={{ uri: url }}
      />

      <View style={styles.infoContainer}>

        <Text style={styles.name}>{name}</Text>

        <View style={styles.statusContainer}>
          {stats.map((stat, index) => <ProfileStats key={index} title={stat.title} desc={stat.desc} />)}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    padding: 16,
    // backgroundColor: "yellow"
  },
  dp: {
    width: 96,
    height: 96,
    marginRight: 16
  },
  infoContainer: {
    display: "flex",
    flexDirection: "column",
  },
  name: {
    fontSize: 40,
    fontWeight: "bold"
  },
  statusContainer: {
    display: "flex",
    flexDirection: "row"
  },
  profileStats: {
    marginRight: 16
  },
  profileStatsTitle: {
    fontSize: 12,
    fontWeight: "bold"
  },
  profileStatsDesc: {
    color: "#c59b2a",
    fontWeight: "bold"

  }

});

export default Profile