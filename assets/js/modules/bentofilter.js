// js/modules/bentoFilter.js

export function initBentoFilter() {

    const filterBtns = document.querySelectorAll('.filter-btn');
    const bentoItems = document.querySelectorAll('.bento-item');

    // Safety check: if there's no gallery on this page, exit immediately
    if (filterBtns.length === 0 || bentoItems.length === 0) return;

    // Cache these elements ONCE instead of re-querying the DOM on every click
    const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
    const yearGroups = document.querySelectorAll('.timeline-year-group');
    const noResultsMsg = document.getElementById('no-results');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-filter');

            if (filterValue === 'all') {
                // Clicked 'All Works' -> Turn off everything else
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            } else {
                // Clicked a specific tag -> Turn off 'All Works'
                if (allBtn) allBtn.classList.remove('active');

                // Toggle the clicked tag
                btn.classList.toggle('active');

                // If they unselected all tags, automatically default back to 'All Works'
                const activeFilters = document.querySelectorAll('.filter-btn.active:not([data-filter="all"])');
                if (activeFilters.length === 0 && allBtn) {
                    allBtn.classList.add('active');
                }
            }

            // Gather an array of strings of all currently active tags
            const activeTags = Array.from(document.querySelectorAll('.filter-btn.active:not([data-filter="all"])'))
                .map(b => b.getAttribute('data-filter'));

            // Show/Hide items based on tags (AND Logic: Item must have ALL active tags)
            bentoItems.forEach(item => {
                const itemTags = item.getAttribute('data-tags') || "";

                let isMatch = true;
                if (activeTags.length > 0) {
                    isMatch = activeTags.every(tag => itemTags.includes(tag));
                }

                if (isMatch) {
                    item.classList.remove('is-hidden');
                    // Retrigger the popIn animation cleanly
                    item.style.animation = 'none';
                    item.offsetHeight; // trigger reflow
                    item.style.animation = null;
                } else {
                    item.classList.add('is-hidden');
                }
            });

            // Cleanup: Recalculate visibility without the month sections
            let totalVisibleItems = 0;

            // Hide the entire Year Group if all its items are filtered out
            yearGroups.forEach(group => {
                // Look directly for visible bento items inside the year group
                const visibleItems = group.querySelectorAll('.bento-item:not(.is-hidden)');

                if (visibleItems.length === 0) {
                    group.classList.add('is-hidden');
                } else {
                    group.classList.remove('is-hidden');
                    totalVisibleItems += visibleItems.length; // Count surviving items
                }
            });

            // Show or hide the Empty State message
            if (noResultsMsg) {
                if (totalVisibleItems === 0) {
                    noResultsMsg.classList.add('is-active');
                } else {
                    noResultsMsg.classList.remove('is-active');
                }
            }
        });
    });
}