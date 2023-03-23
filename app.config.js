export default {
    expo: {
        name: "altegoo-app",
        slug: "altegoo-app",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./assets/icon.png",
        userInterfaceStyle: "light",
        splash: {
            image: "./assets/splash5.png",
            resizeMode: "cover",
            backgroundColor: "#ffffff",
        },
        updates: {
            fallbackToCacheTimeout: 0,
        },
        assetBundlePatterns: ["**/*"],
        ios: {
            bundleIdentifier: "com.gng.altegoo",
            buildNumber: "1.0.0",
        },
        extra: {
            eas: {
                projectId: "0d74eebd-b11d-421e-bce6-587423f34de3",
            },
        },
        android: {
            package: "com.gng.altegoo",
        },
    },
    android: {
        package: "com.gng.altegoo",
        versionCode: 1,
        adaptiveIcon: {
            foregroundImage: "./assets/adaptive-icon.png",
            backgroundColor: "#FFFFFF",
        },
    },
    web: {
        favicon: "./assets/favicon.png",
    },
};
