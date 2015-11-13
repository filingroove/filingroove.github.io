# This kata is translated from js

ttl = 2
testsCnt = 100;

class Scales

	def initialize(ttl, balls)
		@balls = balls
		@n = ttl
	end

	def getWeight(leftPan, rightPan)
		if (@n < 2 && leftPan.is_a?(Array) && 
			rightPan.is_a?(Array) && 
			leftPan.size+rightPan.size == @balls.size
			) then

			leftWeight = getPanWeight(leftPan)
	        rightWeight = getPanWeight(rightPan)

	        if leftWeight == rightWeight then
	            return 0;
	        elsif leftWeight > rightWeight then
	            return -1;
	        else
	             return 1;
	        end
	    else
	    	puts 'Scale is broken ¯\_(ツ)_/¯'
	    end
	end

	def getPanWeight(pan)
		pan.inject(:+)
	end

	def findBall
	end

end

def test
	balls = Array.new(8, 1)
	heavier = rand(balls.size)
	balls[heavier] = 1.15
	scales = Scales.new(2, balls)
	Test.assertEquals(scales.findBall(), heavier);
end

testsCnt.times { |i| test }