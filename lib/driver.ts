import { Config, DriveStep, State } from "driver.js";

const steps: DriveStep[] = [
    {
        element: "#dock",
        popover: {
            title: "Dock",
            description:
                "The dock is where you can navigate between the different tabs of the dashboard, access the shortcuts as well as settings and preferences.",
        },
    },
    {
        element: "#tabs",
        popover: {
            title: "Tabs",
            description:
                "The tabs are where you can navigate between the different sections of the dashboard.",
            side: "bottom",
        },
    },
    {
        element: "#shortcuts",
        popover: {
            title: "Shortcuts Section",
            description:
                "You can add shortcuts to your favourite websites here. Clicking on a shortcut will open the website in a new tab.",
        },
    },
    {
        element: "#shortcut-initial",
        popover: {
            title: "Shortcut",
            description:
                "Open the website by left-clicking on the icon, right-click to open the options menu. Hold and drag to move the shortcut around.",
        },
    },
    {
        element: "#shortcut-add",
        popover: {
            title: "Add Shortcut",
            description: "Click on the + icon to add a new shortcut.",
        },
    },
    {
        element: "#dock-settings",
        popover: {
            title: "Settings",
            description:
                "Here you can change the background, theme, display preferences and other settings of the dashboard.",
        },
    },
    {
        element: "#dock-account",
        popover: {
            title: "Account",
            description:
                "Here you can connect different services to the extension.",
        },
    },
    {
        element: "#spotify-widget",
        popover: {
            title: "Spotify",
            description:
                "This widget shows the current song playing on Spotify. It also allows you to play/pause, skip, and go back to the previous song.",
        },
    },
    {
        element: "#clock-widget",
        popover: {
            title: "Clock",
            description: "You can view the current time here",
        },
    },
    {
        element: "#weather-widget",
        popover: {
            title: "Weather",
            description:
                "In this widget, you can view the current temperature and weather conditions of your location.",
            side: "right",
        },
    },
    {
        element: "#news-widget",
        popover: {
            title: "News",
            description:
                "This widget shows the latest news in the world of technology and programming. Click on a news article to open it in a modal window.",
            side: "right",
        },
    },
    {
        element: "#search-widget",
        popover: {
            title: "Search",
            description:
                "You can search for anything on the web using this widget. To change the search engine, click on the settings icon.",
        },
    },
    {
        popover: {
            title: "🎉 That's all!",
            description:
                "You have completed the tour of the dashboard. You can view this tour again by clicking on the account button in the dock and selecting 'Take a Tour'.",
        },
    },
];

export const driverObj = (setHasTakenTour: any): Config => {
    return {
        showProgress: true,
        animate: true,
        allowKeyboardControl: true,
        doneBtnText: "Done",
        nextBtnText: "Next",
        prevBtnText: "Previous",
        overlayColor: "rgb(--muted)",
        smoothScroll: true,
        stageRadius: 10,
        disableActiveInteraction: true,
        onDestroyed: (
            element?: Element,
            step?: DriveStep,
            options?: { config: Config; state: State }
        ) => {
            setHasTakenTour(true);
        },
        steps: steps,
    };
};
