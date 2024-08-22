const getMovie = async () => {
    const choice = document.getElementById('userChoice').value;
    const movieContainer = document.getElementById('container');

    movieContainer.innerHTML = '';

    const response = await fetch(`
        https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(choice)}&api_key=a3d6a878bad60eae8cf7af53942f60bb
    `);
        
    if (response.ok) {
        const data = await response.json();
        const movieData = (data.results);
        console.log(movieData);
        

        movieData.forEach((item) => {
            const movieBox = document.createElement('div');

            const rating = item.vote_average / 2;
            const filledStars = Math.floor(rating);
            const emptyStars = 5 - filledStars;

            let stars = '';

            for (let i = 0; i < filledStars; i++) {
                stars += '★';
            }

            for (let i = 0; i < emptyStars; i++) {
                stars += '☆';
            }

            let overview = item.overview.split(' ');
            let shortOverview = overview.slice(0, 20).join(' ');
            let fullOverview = item.overview;

            let overviewText = shortOverview;
            if (overview.length > 20) {
                overviewText += '... <span class="read-more" style="color:blue;cursor:pointer;">Read more</span>';
            }

            movieBox.innerHTML = `
                <div class='movieMiniBox'>
                    <h2>${item.title}</h2>
                    <img src="https://image.tmdb.org/t/p/w500${item.poster_path}" alt="${item.title}">
                    <div class="movieInfo">
                        <p><strong>Rating:</strong> ${stars} (${item.vote_average} / 10)</p>
                        <p class="overview"><strong>Overview:</strong> ${overviewText}</p>
                        <div class="extra-info" style="display:none;">
                            <p><strong>Full Overview:</strong> ${fullOverview}</p>
                            <p><strong>Release Date:</strong> ${item.release_date}</p>
                            <p><strong>Popularity:</strong> ${item.popularity}</p>
                            <p><strong>Vote Count:</strong> ${item.vote_count}</p>
                            <p><strong>Language:</strong> ${item.original_language.toUpperCase()}</p>
                            <span class="show-less" style="color:blue;cursor:pointer;display:block;text-align:center;margin-top:10px;">Show less</span>
                        </div>
                    </div>
                </div>
            `;

            movieContainer.appendChild(movieBox);

            const readMoreLink = movieBox.querySelector('.read-more');
            const extraInfo = movieBox.querySelector('.extra-info');
            const showLessLink = movieBox.querySelector('.show-less');

            readMoreLink.addEventListener('click', () => {
                extraInfo.style.display = 'block';
                readMoreLink.style.display = 'none';
            });

            showLessLink.addEventListener('click', () => {
                extraInfo.style.display = 'none';
                readMoreLink.style.display = 'inline';
            });
        });
    } else {
        console.error('Failed to fetch movie data');
    }
};