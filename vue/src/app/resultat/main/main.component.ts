import { Component, OnInit } from '@angular/core';
import { MessageToHeadService } from 'src/app/message-to-head.service';
import { CreateCompService } from 'src/app/competition/create-comp.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  id 
  phase_poule
  constructor(
    private mes : MessageToHeadService,
    private comp: CreateCompService
  ) { 
    this.mes.message.emit({object:'affiche'});

    

  }

  ngOnInit() {
    $(document).on('scroll',function(){
      let height = $('.tete').outerHeight();
      if(height<=95){
        $('.menu1').css({
          'position':'fixed',
           'top': 95,
           'box-shadow': '0px 6px 25px 1px grey',
           'transition': '0.2s  box-shadow ease-in'
        });
        $('.topajuste').css({
          'margin-top':290
        });
        
      }else{
        $('.menu1').css({
          'position':'relative',
          'top':5,
          'box-shadow': '0px 0px 0px 0px grey',
          'transition': '0s  box-shadow ease-in'
        });
        $('.topajuste').css({
          'margin-top': 0
        });
       
      }
    })
  }

}
