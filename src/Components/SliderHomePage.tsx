import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useFetchMoviesQuery } from '../services/moviesApi';


const SliderHomePage: React.FC= () => {

    const { data, error, isLoading } = useFetchMoviesQuery(1);
    console.log('data :>> ', data);

    return (
        <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={10}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            // scrollbar={{ draggable: true }}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper: any) => console.log(swiper)}
            style={{ marginBottom: 50, textAlign: 'center' }}
        >
            {
                data?.results?.map((movie) =>
                    <SwiperSlide key={movie.backdrop_path}>
                        <img style={{ width: 1350, height: 400, filter: 'brightness(40%)' }} src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`} alt={movie.title} />
                        <div style={{
                            position: 'absolute',
                            top: '70%',
                            left: '35%',
                            transform: 'translate(-50%, -50%)',
                            color: '#afaeae',
                            textAlign: 'start'
                        }}>
                            <h1>Wellcome</h1>
                            <h3>Millions of Movies, TV shows and people to discover. Explore now.</h3>
                        </div>
                    </SwiperSlide>
                )
            }
        </Swiper>
    )
}

export default SliderHomePage