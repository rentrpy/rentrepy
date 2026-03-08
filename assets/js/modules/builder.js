import { archiveData } from '../data/archivedata.js';
import { timelineData } from '../data/timelinedata.js';


export function initArchiveBuilder() {
    const timelineContainer = document.querySelector('.bento-timeline');
    if (!timelineContainer) return;

    // Remove all existing year groups, but keep the #no-results div if it's there
    Array.from(timelineContainer.children).forEach(child => {
        if (child.classList.contains('timeline-year-group')) {
            child.remove();
        }
    });

    // Build the DOM
    archiveData.forEach(yearGroup => {
        // 1. Group Container
        const groupDiv = document.createElement('div');
        groupDiv.classList.add('timeline-year-group');

        // 2. Sidebar (Year)
        const sidebarDiv = document.createElement('div');
        sidebarDiv.classList.add('timeline-year-sidebar');
        const yearHeading = document.createElement('h3');
        yearHeading.textContent = yearGroup.year;
        sidebarDiv.appendChild(yearHeading);
        groupDiv.appendChild(sidebarDiv);

        // 3. Content Area
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('timeline-year-content');

        // 4. Bento Grid
        const gridDiv = document.createElement('div');
        gridDiv.classList.add('bento-grid');

        // 5. Build Items
        yearGroup.items.forEach(itemInfo => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('bento-item');
            if (itemInfo.tags) itemDiv.setAttribute('data-tags', itemInfo.tags);
            if (itemInfo.videoId) itemDiv.setAttribute('data-video-id', itemInfo.videoId);
            if (itemInfo.ratio) itemDiv.style.setProperty('--ratio', itemInfo.ratio);

            const imgEl = document.createElement('img');
            imgEl.setAttribute('data-src', itemInfo.imgSrc);
            imgEl.setAttribute('src', '');
            imgEl.setAttribute('loading', 'lazy');
            imgEl.setAttribute('alt', itemInfo.alt || 'Artwork');

            itemDiv.appendChild(imgEl);
            gridDiv.appendChild(itemDiv);
        });

        contentDiv.appendChild(gridDiv);
        groupDiv.appendChild(contentDiv);

        timelineContainer.appendChild(groupDiv);
    });
}

export function initTimelineBuilder() {
    const timelineContainer = document.querySelector('.timeline-container');
    if (!timelineContainer) return;

    // Clear existing content just in case
    timelineContainer.innerHTML = '';

    // Build the DOM dynamically based on timelineData
    timelineData.forEach(itemInfo => {
        // 1. Timeline Item Wrapper
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('timeline-item');

        // 2. Timeline Date
        const dateDiv = document.createElement('div');
        dateDiv.classList.add('timeline-date');
        dateDiv.textContent = itemInfo.date;

        // 3. Timeline Content
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('timeline-content');

        const heading = document.createElement('h3');
        heading.textContent = itemInfo.title;

        const description = document.createElement('p');
        description.textContent = itemInfo.description;

        contentDiv.appendChild(heading);
        contentDiv.appendChild(description);

        // 4. Append
        itemDiv.appendChild(dateDiv);
        itemDiv.appendChild(contentDiv);

        timelineContainer.appendChild(itemDiv);
    });
}
