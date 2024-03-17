import { Story } from './story.ts';

export class StoryService {
    private static STORIES_KEY = 'stories';

    static getStories(): Story[] {
        const storiesData = localStorage.getItem(this.STORIES_KEY);
        if (storiesData) {
            return JSON.parse(storiesData);
        } else {
            return [];
        }
    }

    static saveStories(stories: Story[]): void {
        localStorage.setItem(this.STORIES_KEY, JSON.stringify(stories));
    }
    static addStory(story: Story): void {
        const stories = this.getStories();
        stories.push(story);
        this.saveStories(stories);
    }

    static deleteStory(storyId: number): void {
        let stories = this.getStories();
        stories = stories.filter(story => story.id !== storyId);
        this.saveStories(stories);
    }

    static updateStory(updatedStory: Story): void {
        let stories = this.getStories();
        const index = stories.findIndex(story => story.id === updatedStory.id);
        if (index !== -1) {
            stories[index] = updatedStory;
            this.saveStories(stories);
        }
    }
}