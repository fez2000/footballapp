import { Component, OnInit } from '@angular/core';
import { MessageToHeadService } from 'src/app/message-to-head.service';
import { CreateCompService } from '../create-comp.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  poule = false;
  tour = false
  id;
  private Tstatus
  constructor(
    private mes: MessageToHeadService,
    private comp: CreateCompService,
    private route: Router
  ) {
    this.mes.message.emit({object:'affiche'});
    if(sessionStorage.getItem('user')){
      this.id= JSON.parse( sessionStorage.getItem('user'))['tournois'][0];
      this.Tstatus =  sessionStorage.getItem('Tstatus')
    }
    if(this.Tstatus){
      if(this.Tstatus =='incomplet'){
        this.tour =true
      }else{
        this.poule = true
        this.route.navigate(['/competition/phase_poule']);
      }
    }else{
      this.comp.get_status(this.id).subscribe((e)=>{
        if(e['status'] =='incomplet'){
          this.tour =true
        }else{
          this.poule = true
          this.route.navigate(['/competition/phase_poule']);
        } 
        sessionStorage.setItem('Tstatus',e['status'])
      })
    }

   }

  ngOnInit() {
    $(document).on('scroll',function(){
      let height = $('.tete').outerHeight();
      if(height<=95){
        $('.menu1').css({
          'position':'fixed',
           'top': 95
        });
        $('.topajuste').css({
          'margin-top':290
        });
      }else{
        $('.menu1').css({
          'position':'relative',
          'top':5
        });
        $('.topajuste').css({
          'margin-top':0
        });
      }
      
    })
  }
 
  tournois(){
    console.log(this.id)
    this.comp.create_tournois(this.id).subscribe((e)=>{
      if(e['status']){
        this.tour =false
        this.poule = true
        this.route.navigate(['/competition/phase_poule']);
        sessionStorage.setItem('Tstatus',e['status']);
      }
    })
  }
}
