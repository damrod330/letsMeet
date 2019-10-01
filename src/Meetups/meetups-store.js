import { writable } from "svelte/store"


const meetupsStore = writable([
    {
        id: "m1",
        title: "Coding Bootcamp",
        subtitle: "Learn to code in 2 hours",
        description: "In this meetup, we will learn stuff and it will be great!",
        imageUrl: "https://picsum.photos/id/1075/1200",
        address: "Wojska Polskiego 8, 41-205 Sosnowiec",
        contactEmail: "learn.code@gmail.com",
        isFavorite: false
    },
    {
        id: "m2",
        title: "Lear Svelte",
        subtitle: "Learn Svelte!",
        description: "Great place to get started learning Svelte.",
        imageUrl: "https://picsum.photos/id/1076/1200",
        address: "Wojska Polskiego 8, 41-205 Sosnowiec",
        contactEmail: "svelte.code@test.com",
        isFavorite: false
    }
]);

const customMeetupsStore = {
    subscribe: meetupsStore.subscribe,
    addMeetup: (meetupData) => {
        const newMeetup = {
            id: Math.random().toString(),
            isFavorite: false,
            ...meetupData
        };

        meetupsStore.update((items) => {
            return [newMeetup, ...items];
        })
    },
    updateMeetup: (id, meetupData) => {
        meetupsStore.update(items => {
            const meetupIndex = items.findIndex(i => i.id === id);
            const updatedMeetup = { ...items[meetupIndex], ...meetupData };
            const updatedMeetups = [...items];
            updatedMeetups[meetupIndex] = updatedMeetup;
            return updatedMeetups;
        });
    },
    deleteMeetup: (id) => {
        meetupsStore.update(items => {
            return items.filter(i => i.id !== id);
        })
    },
    toggleFavorite: (id) => {
        meetupsStore.update(items => {
            const updatedMeetup = { ...items.find(m => m.id === id) };
            updatedMeetup.isFavorite = !updatedMeetup.isFavorite;
            const meetupIndex = items.findIndex(m => m.id === id);
            const updatedMeetups = [...items];
            updatedMeetups[meetupIndex] = updatedMeetup;
            return updatedMeetups;
        })
    }
}

export default customMeetupsStore;