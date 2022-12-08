import styled from 'styled-components'

export const FeaturedStyle = styled.div`
    
    .slick-slide > div {
        margin: 0 10px;
    }
    .slick-list {
        margin: 0 -10px;
    }
    .slick-prev:before, .slick-next:before {
        font-size: 34px;
        opacity: 1;
        color: var(--primary-bg);
    }

    .slick-prev {
        left: -40px;
    }
    .slick-next {
        right: -40px;
    }
`