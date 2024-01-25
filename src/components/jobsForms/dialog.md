<Dialog>
        <DialogTrigger asChild>
          <Button>View More</Button>
        </DialogTrigger>

        <DialogContent className="w-full">
          <DialogHeader>
            <DialogTitle>Front End Developer</DialogTitle>
            <DialogDescription>Netflix</DialogDescription>
            <DialogDescription>Chicago, IL</DialogDescription>

            <div className="flex items-center gap-2 ">
              <Button variant="secondary" className="h-[22px] rounded-full">
                <PiMoneyDuotone /> {USDollar.format(salary)}
              </Button>
              <Button variant="secondary" className="h-[22px] rounded-full">
                <FaCalendarAlt /> {type}
              </Button>
              <Button variant="secondary" className="h-[22px] rounded-full">
              <LuGraduationCap /> {experienceLevel}
              </Button>
            </div>
            <Button className="w-[50%]">
              <a href={applicationUrl} target="_blank">
                Apply On Company Site
              </a>
            </Button>
          </DialogHeader>
          <p>{fullDesc}</p>
        </DialogContent>
      </Dialog>
