import Link from 'next/link'
import Image from 'next/image'

import menCollectionImg from '../public/img/collection-men.jpg'
import womenCollectionImg from '../public/img/collection-women.jpg'
import kidCollectionImg from '../public/img/collection-kid.jpg'

const MainCollections: React.FC = () => (
    <div className="main-collections">
        <div className="image-container">
        <Image src={menCollectionImg} alt="men-collection"/>
        <div className="image-title">
            <Link href="/catalog/men">
                <a>MEN</a>
            </Link>
        </div>
        </div>
        <div className="image-container">
        <Image src={womenCollectionImg} alt="women-collection"/>
        <div className="image-title">
            <Link href="/catalog/women">
                <a>WOMEN</a>
            </Link>
        </div>
        </div>
        <div className="image-container">
        <Image src={kidCollectionImg} alt="kid-collection"/>
        <div className="image-title">
            <Link href="/catalog/kid">
                <a>KID</a>
            </Link>
        </div>
        </div>
    </div>
)

export default MainCollections