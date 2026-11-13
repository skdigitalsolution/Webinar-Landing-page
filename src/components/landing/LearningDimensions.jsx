import Container from '../ui/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import LearningDimensionCard from '../learning/LearningDimensionCard.jsx'
import { learningDimensions, learningCopy } from '../../data/webinarLearning.js'

export default function LearningDimensions() {
  return <section id="learning-dimensions" className="learning-section learning-dimensions" aria-labelledby="learning-dimensions-title"><Container><div data-learning-reveal><SectionHeading eyebrow="AI AS A SUPPORTING TOOL" id="learning-dimensions-title" title={learningCopy.dimensionsTitle} description={learningCopy.dimensionsDescription}/></div><div className="learning-dimension-grid">{learningDimensions.map((dimension,index)=><LearningDimensionCard key={dimension.id} dimension={dimension} index={index}/>)}</div><p className="learning-demonstration-note small-copy">{learningCopy.demonstrationNote}</p></Container></section>
}
